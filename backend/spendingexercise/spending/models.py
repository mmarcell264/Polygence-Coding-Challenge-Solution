from django.db import models

# Create your models here.
class Spending(models.Model):
    description = models.CharField(max_length=50)
    amount = models.FloatField()
    spent_at = models.DateTimeField()
    currency = models.CharField(max_length=10)

    class Meta:
        ordering = ['-spent_at']
