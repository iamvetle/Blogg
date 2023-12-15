from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"

    def ready(self):
        """
        This method is called when Django starts.
        It imports the signals module, effectively connecting the signals to the app.
        """
        import users.signals  # noqa
