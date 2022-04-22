from flask_api.config.mysqlconnection import connectToMySQL

class Comment:
    db_name = "social_media_site"
    
    def __init__( self, data ) -> None:
        self.id = data["id"]
        self.content = data["content"]
        
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        
        self.likes = []