'use babel';

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
      let output = selection.replace(/(^|\W)(He)(?=\W)/gm, '$1She');
      // he/she (before = space, after = space or punct.)
      output = output.replace(/(^|\W)(he)(?=\W)/gm, '$1she');
      // him/her
      output = output.replace(/(^|\W)(him)(?=\W)/gm, '$1her');
      // himself/herself
      output = output.replace(/(^|\W)(himself)(?=\W)/gm, '$1herself');
      // His/Her
      output = output.replace(/(^|\W)(His)(?=\W)/gm, '$1Her');
      // his/her
      output = output.replace(/(^|\W)(his)(?=\W)/gm, '$1her');
      editor.insertText(output);
    }
  },

  maleify() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      // He/She (before = space or start of line, after = space or punct.)
      let output = selection.replace(/(^|\W)(She)(?=\W)/gm, '$1He');
      // he/she (before = space, after = space or punct.)
      output = output.replace(/(^|\W)(she)(?=\W)/gm, '$1he');
      // himself/herself
      output = output.replace(/(^|\W)(herself)(?=\W)/gm, '$1himself');
      // His/Her
      output = output.replace(/(^|\W)(Her)(?=\W)/gm, '$1His');
      // her/<him|his> (can't figure out how to distinguish!)
      output = output.replace(/(^|\W)(her)(?=\W)/gm, '$1him-his');
      editor.insertText(output);
    }
  },

};
