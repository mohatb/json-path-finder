# Use official nginx image
FROM nginx:alpine

# Copy your entire project into nginx html directory (overwrites default index.html if present)
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Default command to run nginx
CMD ["nginx", "-g", "daemon off;"]
