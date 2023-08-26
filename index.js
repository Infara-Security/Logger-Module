window.launcher.addModule("logger",
    () => { //activate

        // Initialize the logger module within the launcher's namespace
        window[launcher.config.name].logger = {

            /**
             * Parses the type of log.
             * @param {string} type - The type of log.
             * @returns {string} - The parsed type of log.
             */
            _parseType(type) {
                switch (type) {
                    case "info":
                    case "warn":
                    case "error":
                        return type;
                    default:
                        return "log";
                }
            },

            /**
             * Logs a message with the specified type and module.
             * @param {string} type - The type of log.
             * @param {string} module - The module to log.
             * @param {...any} message - The message to log.
             */
            _log(type, module, ...message) {
                // Check if debugging is enabled
                if (window.launcher.config.debug === true) {
                    type = this._parseType(type);
                    // Output the log message with appropriate styling
                    console[type](
                        `%c[${window.launcher.config.name}]%c %c${module}%c`,
                        "color: #00FFFF; font-weight: 700;",
                        "",
                        "color: #396CB8",
                        "",
                        ...message
                    );
                }
            },

            /**
             * Logs a message with the specified module using the 'log' type.
             * @param {string} module - The module to log.
             * @param {...any} message - The message to log.
             */
            log(module, ...message) {
                this._log("log", module, ...message);
            },

            /**
             * Logs a message with the specified module using the 'info' type.
             * @param {string} module - The module to log.
             * @param {...any} message - The message to log.
             */
            info(module, ...message) {
                this._log("info", module, ...message);
            },

            /**
             * Logs a message with the specified module using the 'warn' type.
             * @param {string} module - The module to log.
             * @param {...any} message - The message to log.
             */
            warn(module, ...message) {
                this._log("warn", module, ...message);
            },

            /**
             * Logs a message with the specified module using the 'error' type.
             * @param {string} module - The module to log.
             * @param {...any} message - The message to log.
             */
            error(module, ...message) {
                this._log("error", module, ...message);
            }
        }
    },
    () => { //deactivate
        // When the module is deactivated, remove the logger from the launcher's namespace
        delete window[launcher.config.name].logger;
        // Revert back to using the default console logger
        window[launcher.config.name].logger = console;
    }
);
