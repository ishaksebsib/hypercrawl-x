FROM node:22.6-slim

# Install necessary packages for Puppeteer
RUN apt-get update && apt-get install -y \
	gconf-service \
	libasound2 \
	libatk1.0-0 \
	libatk-bridge2.0-0 \
	libcups2 \
	libdbus-1-3 \
	libx11-xcb1 \
	libxcomposite1 \
	libxdamage1 \
	libxrandr2 \
	libgbm1 \
	libgtk-3-0 \
	libnss3 \
	libpango-1.0-0 \
	libxss1 \
	libglib2.0-0 \
	ca-certificates \
	fonts-liberation \
	libappindicator3-1 \
	libnss3 \
	lsb-release \
	xdg-utils \
	wget \
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
