FROM node:22.6-slim

# Install necessary packages for Puppeteer
RUN apt-get update && apt-get install -y \
	libgobject-2.0-0 \
	libglib2.0-0 \
	libnss3 \
	libxss1 \
	libasound2 \
	libatk1.0-0 \
	libatk-bridge2.0-0 \
	libx11-xcb1 \
	libxcomposite1 \
	libxcursor1 \
	libxdamage1 \
	libxi6 \
	libxrandr2 \
	libgbm1 \
	libpango-1.0-0 \
	libcups2 \
	curl \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
