// Copyright (c) José Romero
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

import {init, animate} from './visualizations';

export class LinkedListModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: LinkedListModel.model_name,
      _model_module: LinkedListModel.model_module,
      _model_module_version: LinkedListModel.model_module_version,
      _view_name: LinkedListModel.view_name,
      _view_module: LinkedListModel.view_module,
      _view_module_version: LinkedListModel.view_module_version,
      value: 'First node',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'LinkedListModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'LinkedListView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class LinkedListView extends DOMWidgetView {
  private _linkedList: HTMLDivElement;

  render() {
  
    this._linkedList = document.createElement('div');
    this.el.appendChild(this._linkedList);

    init(this._linkedList);
    animate();

    this.el.classList.add('custom-widget');

    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    animate();
  }
}
