# Generated by Django 4.0.6 on 2022-07-13 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Spending',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=50)),
                ('amount', models.FloatField()),
                ('spent_at', models.DateTimeField()),
                ('currency', models.CharField(max_length=10)),
            ],
            options={
                'ordering': ['-spent_at'],
            },
        ),
    ]
