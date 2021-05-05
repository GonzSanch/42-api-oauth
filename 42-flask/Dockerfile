FROM alpine:latest

ENV FLASK_APP=app.py
ENV FLASK_DEBUG=true
ENV API42_CLIENT_ID=029355a04bc008a87fc8c10b8747115f7cad59ba6c9be116c705cacc234cbc8e
ENV API42_CLIENT_SECRET=134e21e96267bfd872ec7a12db5b963d9c41b431fa5be5e607242bb417138e2b

RUN apk add --update --no-cache \
    python3 \
    py-pip \
    py3-setuptools \
    gcc \
    python3-dev \
    libc-dev \
    libffi-dev \
    openssl-dev \
    cargo \
    rust \
    bind-tools 

RUN pip --version

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 3001

ENTRYPOINT ["flask", "run", "--cert=adhoc", "--host=0.0.0.0", "-p 3001"]