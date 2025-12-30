# Use a lightweight Node.js image for building (customizable via ARG)
ARG NODE_VERSION
ARG NGINX_PORT

FROM node:${NODE_VERSION} AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY reactjs-files/package.json reactjs-files/package-lock.json ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY reactjs-files .

# Build the React.js application (outputs to /app/dist)
RUN npm run build

FROM nginx

ARG NGINX_PORT

RUN echo ${NGINX_PORT}

COPY conf/nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory

COPY  --from=builder /app/dist /usr/share/nginx/html

EXPOSE ${NGINX_PORT}

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]