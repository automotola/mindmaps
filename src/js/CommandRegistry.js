mindmaps.CommandRegistry = function(shortcutController) {
	this.commands = {};

	function registerShortcut(command) {
		if (command.shortcut && command.execute) {
			shortcutController.register(command.shortcut, command.execute
					.bind(command));
		}
	}

	function unregisterShortcut(command) {
		if (command.shortcut) {
			shortcutController.unregister(command.shortcut);
		}
	}

	this.get = function(commandType) {
		var command = this.commands[commandType];
		if (!command) {
			command = new commandType;
			this.commands[commandType] = command;

			if (shortcutController) {
				registerShortcut(command);
			}
		}
		return command;
	};

	this.remove = function(commandType) {
		// TODO remove by object
		var command = this.commands[commandType];
		if (!command) {
			return;
		}

		delete this.commands[commandType];

		if (shortcutController) {
			unregisterShortcut(command);
		}
	};
};