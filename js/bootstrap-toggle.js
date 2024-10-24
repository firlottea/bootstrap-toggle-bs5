/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */


+function () {
	'use strict';

	// TOGGLE PUBLIC CLASS DEFINITION
	// ==============================

	class Toggle {
		constructor(element, options) {
			this.element = element;
			this.options = Object.assign({}, this.defaults(), options);
			this.render();
		}

		defaults() {
			return {
				on: this.element.getAttribute('data-on') || Toggle.DEFAULTS.on,
				off: this.element.getAttribute('data-off') || Toggle.DEFAULTS.off,
				onstyle: this.element.getAttribute('data-onstyle') || Toggle.DEFAULTS.onstyle,
				offstyle: this.element.getAttribute('data-offstyle') || Toggle.DEFAULTS.offstyle,
				size: this.element.getAttribute('data-size') || Toggle.DEFAULTS.size,
				style: this.element.getAttribute('data-style') || Toggle.DEFAULTS.style,
				width: this.element.getAttribute('data-width') || Toggle.DEFAULTS.width,
				height: this.element.getAttribute('data-height') || Toggle.DEFAULTS.height
			}
		}

		render() {
			this._onstyle = 'btn-' + this.options.onstyle;
			this._offstyle = 'btn-' + this.options.offstyle;
			let size = this.options.size === 'large' ? 'btn-lg'
				: this.options.size === 'small' ? 'btn-sm'
				: this.options.size === 'mini' ? 'btn-xs'
				: '';
			let toggleOn = document.createElement('label');
			toggleOn.className = 'btn ' + this._onstyle + ' ' + size;
			toggleOn.innerHTML = this.options.on;
			let toggleOff = document.createElement('label');
			toggleOff.className = 'btn ' + this._offstyle + ' ' + size + ' active';
			toggleOff.innerHTML = this.options.off;
			let toggleHandle = document.createElement('span');
			toggleHandle.className = 'toggle-handle btn btn-default ' + size;
			let toggleGroup = document.createElement('div');
			toggleGroup.className = 'toggle-group';
			toggleGroup.appendChild(toggleOn);
			toggleGroup.appendChild(toggleOff);
			toggleGroup.appendChild(toggleHandle);
			let toggle = document.createElement('div');
			toggle.className = 'toggle btn ' + (this.element.checked ? this._onstyle : this._offstyle + ' off') + ' ' + size + ' ' + this.options.style;
			toggle.setAttribute('data-toggle', 'toggle');

			this.element.parentNode.insertBefore(toggle, this.element.nextSibling);
			toggle.appendChild(this.element);
			toggle.appendChild(toggleGroup);

			let width = this.options.width || Math.max(toggleOn.offsetWidth, toggleOff.offsetWidth) + (toggleHandle.offsetWidth / 2);
			let height = this.options.height || Math.max(toggleOn.offsetHeight, toggleOff.offsetHeight);
			toggleOn.classList.add('toggle-on');
			toggleOff.classList.add('toggle-off');
			toggle.style.width = width + 'px';
			toggle.style.height = height + 'px';
			if (this.options.height) {
				toggleOn.style.lineHeight = toggleOn.offsetHeight + 'px';
				toggleOff.style.lineHeight = toggleOff.offsetHeight + 'px';
			}
			this.update(true);
			this.trigger(true);
		}

		toggle() {
			if (this.element.checked) this.off();
			else this.on();
		}

		on(silent) {
			if (this.element.disabled) return false;
			this.element.parentNode.classList.remove(this._offstyle, 'off');
			this.element.parentNode.classList.add(this._onstyle);
			this.element.checked = true;
			if (!silent) this.trigger();
		}

		off(silent) {
			if (this.element.disabled) return false;
			this.element.parentNode.classList.remove(this._onstyle);
			this.element.parentNode.classList.add(this._offstyle, 'off');
			this.element.checked = false;
			if (!silent) this.trigger();
		}

		enable() {
			this.element.parentNode.removeAttribute('disabled');
			this.element.disabled = false;
		}

		disable() {
			this.element.parentNode.setAttribute('disabled', 'disabled');
			this.element.disabled = true;
		}

		update(silent) {
			if (this.element.disabled) this.disable();
			else this.enable();
			if (this.element.checked) this.on(silent);
			else this.off(silent);
		}

		trigger(silent) {
			this.element.removeEventListener('change', this.update);
			if (!silent) {
				let event = new Event('change', { bubbles: true });
				this.element.dispatchEvent(event);
			}
			this.element.addEventListener('change', this.update.bind(this));
		}

		destroy() {
			this.element.removeEventListener('change', this.update);
			this.element.parentNode.querySelector('.toggle-group').remove();
			this.element.parentNode.replaceWith(this.element);
			this.element.removeAttribute('data-toggle');
		}
	}

	Toggle.VERSION = '2.2.0'

	Toggle.DEFAULTS = {
		on: 'On',
		off: 'Off',
		onstyle: 'primary',
		offstyle: 'default',
		size: 'normal',
		style: '',
		width: null,
		height: null
	}

	// TOGGLE PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.forEach(function (element) {
			let data = element.dataset.bsToggle;
			let options = typeof option === 'object' && option;

			if (!data) {
				data = new Toggle(element, options);
				element.dataset.bsToggle = data;
			}
			if (typeof option === 'string' && typeof data[option] === 'function') {
				data[option]();
			}
		});
	}

	let old = Element.prototype.bootstrapToggle;

	Element.prototype.bootstrapToggle = Plugin;
	Element.prototype.bootstrapToggle.Constructor = Toggle;

	// TOGGLE NO CONFLICT
	// ==================

	Element.prototype.toggle.noConflict = function () {
		Element.prototype.bootstrapToggle = old;
		return this;
	}

	// TOGGLE DATA-API
	// ===============

	document.addEventListener('DOMContentLoaded', function() {
		let checkboxes = document.querySelectorAll('input[type=checkbox][data-toggle^=toggle]');
		checkboxes.forEach(function(checkbox) {
			checkbox.bootstrapToggle();
		});
	});

	document.addEventListener('click', function(e) {
		if (e.target.closest('div[data-toggle^=toggle]')) {
			let checkbox = e.target.closest('div[data-toggle^=toggle]').querySelector('input[type=checkbox]');
			checkbox.bootstrapToggle('toggle');
			e.preventDefault();
		}
	});

}();
