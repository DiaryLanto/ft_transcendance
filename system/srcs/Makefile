NGINX_DIR=services/nginx

all:
	set -a; . ./.env; set +a; envsubst < $(NGINX_DIR)/conf/nginx.conf.template > $(NGINX_DIR)/conf/nginx.conf