using MassTransit;
using NotificationService.Hubs;

var builder = WebApplication.CreateBuilder(args);

var rabbitMqHost = builder.Configuration.GetValue<string>("RabbitMq:Host", "localhost");
var rabbitMqUsername = builder.Configuration.GetValue<string>("RabbitMq:Username", "guest");
var rabbitMqPassword = builder.Configuration.GetValue<string>("RabbitMq:Password", "guest");

Console.WriteLine($"RabbitMQ Host: {rabbitMqHost}");
Console.WriteLine($"RabbitMQ Username: {rabbitMqUsername}");

builder.Services.AddMassTransit(x => 
{
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("nt", false));

    x.UsingRabbitMq((context, cfg) => 
    {
        cfg.Host(rabbitMqHost, "/", host => {
            host.Username(rabbitMqUsername);
            host.Password(rabbitMqPassword);
        });

        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.MapHub<NotificationHub>("/notifications");

app.Run();
