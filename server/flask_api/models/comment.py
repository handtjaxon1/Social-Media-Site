from flask_api.config.mysqlconnection import connectToMySQL

class Comment:
    db_name = "social_media_site"
    
    def __init__( self, data ) -> None:
        self.id = data["id"]
        self.content = data["content"]
        self.likes = data["likes"]
        
        self.post = None
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
    def check_owner( cls, user_id, comment_id ):
        comment = cls.get_by_id( {"id": comment_id}, JSON=True )
        
        if comment["user_id"] == user_id:
            return True
        else:
            return False
    
    # ---------- Database Entry Modifying Queries
    @classmethod
    def create( cls, data ):
        query = """INSERT INTO comments (content, likes, post_id, user_id, created_at, updated_at) 
                VALUES(%(content)s, %(likes)s, %(post_id)s, %(user_id)s, NOW(), NOW());"""
        return connectToMySQL(cls.db_name).query_db( query, data )
    @classmethod
    def update( cls, data ):
        query = """UPDATE comments SET content=%(content)s, likes=%(likes)s,
                    updated_at=NOW()
                    WHERE id=%(id)s;"""
        return connectToMySQL(cls.db_name).query_db( query, data )
    @classmethod
    def delete( cls, data ):
        query = "DELETE FROM comments WHERE id = %(id)s"
        connectToMySQL(cls.db_name).query_db( query, data )
        return {"confirmation": "Post successfully deleted"}
    
    # ---------- Get Method Queries
    @classmethod
    def get_by_id( cls, data, JSON=False ):
        query = """SELECT * FROM comments
                    WHERE id = %(id)s;"""
        result = connectToMySQL(cls.db_name).query_db( query, data )
        
        if JSON:
            return result[0]
        else:
            return cls( result[0] )
    @classmethod
    def get_all_by_post_id_with_user( cls, data ):
        query = """SELECT * FROM comments
                    JOIN users ON users.id = comments.user_id
                    WHERE comments.post_id = %(post_id)s
                    ORDER BY comments.created_at ASC"""
        results = connectToMySQL(cls.db_name).query_db( query, data )
        
        comments = list()
        for result in results:
            comments.append({
                "id": result["id"],
                "content": result["content"],
                "likes": result["likes"],
                "user": {
                    "display_name": result["display_name"],
                    "username": result["username"],
                    "profile_img_url": result["profile_img_url"]
                }
            })
        return comments
