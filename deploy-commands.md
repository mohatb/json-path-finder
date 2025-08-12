# Deployment Commands to Fix the Issue

## If using Docker Compose:
```bash
# Pull latest image and restart
docker-compose pull
docker-compose up -d --force-recreate

# Or specify the image explicitly
docker-compose down
docker-compose up -d
```

## If using Docker directly:
```bash
# Stop and remove old container
docker stop <container-name>
docker rm <container-name>

# Pull latest image
docker pull mohatb/json-path-finder:latest

# Run new container
docker run -d -p 80:80 --name json-path-finder mohatb/json-path-finder:latest
```

## If using Kubernetes:
```bash
# Force rolling update
kubectl rollout restart deployment/json-path-finder

# Or delete and recreate pods
kubectl delete pods -l app=json-path-finder
```

## If using a cloud platform (AWS, GCP, Azure):
- Check if your deployment is configured to pull the latest image
- Make sure the image tag is set to 'latest' or use a specific version tag
- Trigger a new deployment/redeployment

## Verification Commands:
```bash
# Check what's running in production
curl -I https://json.naascloud.com/assets/index-DAKrKwX1.js
# Should return 200 OK with application/javascript

# Check if the container is serving built files
docker exec <container-name> ls -la /usr/share/nginx/html/assets/
```
