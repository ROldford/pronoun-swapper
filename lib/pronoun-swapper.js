'use babel';

import PronounSwapperView from './pronoun-swapper-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pronoun-swapper:femaleify': () => this.femaleify(),
      'pronoun-swapper:maleify': () => this.maleify()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  femaleify() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      // He/She (before = space or start of line, after = space or punct.)
      let output = selection.replace(/(^|\ )(He)([\.\ ,])/gm, '$1She$3');
      // he/she (before = space, after = space or punct.)
      output = output.replace(/(^|\ )(he)([\.\ ,])/gm, '$1she$3');
      // him/her
      output = output.replace(/(^|\ )(him)([\.\ ,])/gm, '$1her$3');
      // himself/herself
      output = output.replace(/(^|\ )(himself)([\.\ ,])/gm, '$1herself$3');
      // His/Her
      output = output.replace(/(^|\ )(His)([\.\ ,])/gm, '$1Her$3');
      // his/her
      output = output.replace(/(^|\ )(his)([\.\ ,])/gm, '$1her$3');
      editor.insertText(output);
    }
  },

  maleify() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      // He/She (before = space or start of line, after = space or punct.)
      let output = selection.replace(/(^|\ )(She)([\.\ ,])/gm, '$1He$3');
      // he/she (before = space, after = space or punct.)
      output = output.replace(/(^|\ )(she)([\.\ ,])/gm, '$1he$3');
      // him/her
      output = output.replace(/(^|\ )(her)([\.\ ,])/gm, '$1him$3');
      // himself/herself
      output = output.replace(/(^|\ )(herself)([\.\ ,])/gm, '$1himself$3');
      // His/Her
      output = output.replace(/(^|\ )(Her)([\.\ ,])/gm, '$1His$3');
      // his/her
      output = output.replace(/(^|\ )(her)([\.\ ,])/gm, '$1his$3');
      editor.insertText(output);
    }
  },

};
