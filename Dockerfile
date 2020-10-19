############
# Greeting #
############

FROM node:12-slim as base

ENV USER dockerfileUser

# Copy our App dependencies and credentials
# This is done early so deps can be cached by dockerZ
WORKDIR /home/$USER

COPY --chown=root:root . .

RUN npm install 
RUN npm run build

# ======== THE FINAL STAGE ======
FROM node:12-slim

LABEL maintainer="Yosnier Samon"

ENV USER dockerfileUser

WORKDIR /home/$USER

COPY package.json package.json

# Change to non-root user
RUN groupadd --system $USER --gid 433 && \
    useradd --uid 431 --system --gid $USER --shell /sbin/nologin --comment "User inside Docker containers" $USER && \
    chown -R $USER:$USER /home/$USER
USER $USER

# Install Node dependencies and remove NPM cache
RUN npm install --production && \
    npm cache clean -f && \
    rm -rf /home/$user/.node-gyp && \
    rm -rf /tmp/npm-* && \
    rm -rf package*.json

# Copy dist
COPY --from=base /home/$USER/dist .

EXPOSE 3000

# Log debugging variables
ENV LOG_LEVEL DEBUG
ENV NODE_ENV production
ENV API_PORT 3000

CMD [ "node", "--optimize_for_size", "main.js" ]
