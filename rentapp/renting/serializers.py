from rest_framework.response import Response
from .models import Room, Post, User, Comment
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    rooms = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    comment = serializers.SerializerMethodField()

    def get_comment(self, obj):
        from .serializers import CommentSerializer
        return CommentSerializer(obj.comments.all(), many=True, context=self.context).data

    def get_user(self, obj):
        from .serializers import SimpleUserSerializer
        return SimpleUserSerializer(obj.user).data

    def get_rooms(self, obj):
        from .serializers import RoomSerializer
        return RoomSerializer(obj.rooms.all(), many=True, context=self.context).data

    class Meta:
        model = Post
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    # post = PostSerializer()

    def get_image(self, room):

        if room.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % room.image.name)
            return '/static/%s'

    class Meta:
        model = Room
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'phone_num', 'is_owner', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()

        user = User(**data)
        user.set_password(data['password'])
        user.save()

        return user


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        from .serializers import SimpleUserSerializer
        return SimpleUserSerializer(obj.user).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user']


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'avatar']
