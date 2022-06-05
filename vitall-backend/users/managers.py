from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):

    def create_user(self, email, organisation, password, **extra_fields):
        if not email:
            raise ValueError(_("The email must be set"))
        if not organisation:
            raise ValueError(_("The organisation name must be set"))
        if not password:
            raise ValueError(_("The password must be set"))
        email = self.normalize_email(email)

        user = self.model(email=email, organisation=organisation, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, organisation, password, **extra_fields):
        user = self.create_user(
            email=self.normalize_email(email),
            organisation=organisation,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)