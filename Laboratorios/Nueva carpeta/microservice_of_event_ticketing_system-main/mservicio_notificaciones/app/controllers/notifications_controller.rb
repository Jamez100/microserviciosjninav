require 'sinatra/base'
require 'json'
require 'mail'
require 'dotenv/load'

class NotificationsController < Sinatra::Base
  set :bind, '0.0.0.0'
    get '/' do
    "¡Servicio de Notificaciones Funcionando!"
  end

  post '/notify' do
    content_type :json
    data = JSON.parse(request.body.read)

    mail = Mail.new do
      from    'from@example.com'
      to      data['to']
      subject data['subject']
      body    data['body']
    end

    begin
      mail.deliver!
      { status: 'success', message: 'Correo enviado correctamente' }.to_json
    rescue => e
      { status: 'error', message: e.message }.to_json
    end
  end

  get '/health' do
    content_type :json
    { status: 'OK', timestamp: Time.now }.to_json
  end
end

# Configura la entrega de correos con Mailtrap
Mail.defaults do
  delivery_method :smtp, {
    address:              ENV['SMTP_HOST'],
    port:                 ENV['SMTP_PORT'],
    user_name:            ENV['SMTP_USER'],
    password:             ENV['SMTP_PASSWORD'],
    authentication:       :login,
    enable_starttls_auto: true
  }
end
