FROM ruby:3.2

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test && \
    gem install puma  # Añade esta línea

COPY . .

EXPOSE 3000
CMD ["bundle", "exec", "puma", "-p", "3000", "-b", "tcp://0.0.0.0"]