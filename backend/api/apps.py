from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
    def ready(self):
        """
        This method is called when Django starts.
        It imports the signals module, effectively connecting the signals to the app.
        """
        import api.signals  # noqa
