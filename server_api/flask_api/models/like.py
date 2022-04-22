from flask_api.config.mysqlconnection import connectToMySQL

class Like:
    db_name = "social_media_site"
    
    def __init__( self, data ) -> None:
        self.id = data["id"]
        
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]