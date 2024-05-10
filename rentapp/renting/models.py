from django.db import models
# from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    avatar = CloudinaryField('avatar', null=True)
    phone_num = models.CharField(max_length=50, null=True, unique=True)
    is_owner = models.BooleanField(default=False)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='posts')
    title = models.CharField(max_length=50, null=False)
    body = RichTextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Room(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='room_user')
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True, related_name='rooms')
    room_submit = models.ForeignKey('RoomSubmit', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='renting/%Y/%m')
    address = models.CharField(max_length=150)
    status = models.BooleanField(default=True)
    # thieu truong location
    num_people = models.IntegerField(null=True)
    cost = models.FloatField()


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='cmt_user')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = RichTextField()
    created_ad = models.DateTimeField(auto_now_add=True)


class RoomSubmit(models.Model):
    status = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)


class Follow(models.Model):
    user_cus = models.ForeignKey(User, related_name='owner_follows', on_delete=models.CASCADE, null=True)
    user_owner = models.ForeignKey(User, related_name='customer_follows', on_delete=models.CASCADE, null=True)



