from unittest import result
from flask_api.config.mysqlconnection import connectToMySQL
from flask_api.models import comment

class Post:
    db_name = "social_media_site"
    
    def __init__( self, data ) -> None:
        self.id = data["id"]
        self.content = data["content"]
        self.likes = data["likes"]
        
        self.comments = []
        
        self.user = None
        
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
    
    # ---------- Model Validation
    @classmethod
    def validate( cls, post ):
        is_valid = True
        errors = dict()
        
        if len(post["content"]) < 1:
            errors["content"] = "Content must be greater than 0 characters."
            is_valid = False
        
        return ( is_valid, errors )
    @classmethod
    def check_owner( cls, user_id, post_id ):
        post = cls.get_by_id( {"id": post_id}, JSON=True )
        
        if post["user_id"] == user_id:
            return True
        else:
            return False
    
    # ---------- Database Entry Modifying Queries
    @classmethod
    def create( cls, data ):
        query = """INSERT INTO posts (content, likes, user_id, created_at, updated_at) 
                VALUES(%(content)s, %(likes)s, %(user_id)s, NOW(), NOW());"""
        return connectToMySQL(cls.db_name).query_db( query, data )
    @classmethod
    def update( cls, data ):
        query = """UPDATE posts SET content=%(content)s, likes=%(likes)s,
                    updated_at=NOW()
                    WHERE id=%(id)s;"""
        return connectToMySQL(cls.db_name).query_db( query, data )
    @classmethod
    def delete( cls, data ):
        query = "DELETE FROM posts WHERE id = %(id)s"
        connectToMySQL(cls.db_name).query_db( query, data )
        return {"confirmation": "Post successfully deleted"}
    
    # ---------- Get Method Queries
    @classmethod
    def get_by_id( cls, data, JSON=False ):
        query = "SELECT * FROM posts WHERE id = %(id)s"
        result = connectToMySQL(cls.db_name).query_db( query, data )
        
        if JSON:
            return result[0]
        else:
            return cls( result[0] )
    @classmethod
    def get_all( cls, JSON=False ):
        query = "SELECT * FROM posts;"
        results = connectToMySQL(cls.db_name).query_db( query )
        
        if JSON:
            return results;
        else:
            users = list()
            for result in results:
                users.append( cls(result) )
            return users
    @classmethod
    def get_all_with_user( cls, JSON=False ):
        query = """SELECT * FROM posts
                    JOIN users ON users.id = posts.user_id"""
        results = connectToMySQL(cls.db_name).query_db( query )
        
        if JSON:
            posts = list()
            for result in results:
                posts.append({
                    "id": result["id"],
                    "content": result["content"],
                    "likes": result["likes"],
                    "user": {
                        "id": result["user_id"],
                        "display_name": result["display_name"],
                        "username": result["username"],
                        "profile_img_url": result["profile_img_url"]
                    }
                })
            return posts
        else:
            posts = list()
            for result in results:
                user = {
                    "id": result["user_id"],
                    "display_name": result["display_name"],
                    "username": result["username"],
                    "profile_img_url": result["profile_img_url"]
                }
                post = Post({
                    "id": result["id"],
                    "content": result["content"],
                    "likes": result["likes"]
                })
                post.user = user
                posts.append( post )
            return posts
    @classmethod
    def get_by_id_with_comments( cls, data ):
        query = """SELECT * FROM posts
                    JOIN users ON users.id = posts.user_id
                    WHERE posts.id = %(post_id)s;"""
        result = connectToMySQL(cls.db_name).query_db( query, data )[0]
        comments = comment.Comment.get_all_by_post_id_with_user( data )
        
        post = {
            "id": result["id"],
            "content": result["content"],
            "likes": result["likes"],
            "user": {
                "id": result["user_id"],
                "display_name": result["display_name"],
                "username": result["username"],
                "profile_img_url": result["profile_img_url"]
            },
            "comments": comments
        }
        return post
    