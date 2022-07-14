from rest_framework import serializers
from .models import Spending

class SpendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spending
        fields = ['id', 'description', 'amount', 'spent_at', 'currency']

    def validate_amount(self, value):
        if value < 0 :
            raise serializers.ValidationError("The amount field cannot be negative.")
        return value
