# Use the specified version of Node
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Install dependencies
RUN yarn install


# The command to run your app (assuming 'yarn start' starts your server)
CMD ["yarn", "start"]

# Expose the port the app runs on
EXPOSE 3000
