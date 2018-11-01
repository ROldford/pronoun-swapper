'use babel';

import PronounSwapper from '../lib/pronoun-swapper';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PronounSwapper', () => {
  let workspaceElement, activationPromise;
  let maleText = 'He He He. He, he he. he, him him. him, himself himself. himself, His His. His, his his. his, ';
  let femaleText = 'She She She. She, she she. she, her her. her, herself herself. herself, Her Her. Her, her her. her, ';
  let maleifyResult = 'He He He. He, he he. he, him-his him-his. him-his, himself himself. himself, His His. His, him-his him-his. him-his, ';
  let mixedText = maleText + femaleText;
  let mixedMaleifyResult = maleText + maleifyResult;
  let mixedFemaleifyResult = femaleText + femaleText;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pronoun-swapper');

    waitsForPromise(() => atom.workspace.open());
  });

  describe('when maleify is selected', () => {
    it('converts female pronouns to male', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(femaleText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:maleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(maleifyResult))
    });

    it('does not change male pronouns', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(maleText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:maleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(maleText))
    });

    it('deals appropriately with mixed pronouns', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(mixedText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:maleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(mixedMaleifyResult))
    });

  });

  describe('when femaleify is selected', () => {
    it('converts male pronouns to female', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(maleText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:femaleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(femaleText))
    });

    it('does not change female pronouns', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(femaleText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:femaleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(femaleText))
    });

    it('deals appropriately with mixed pronouns', () => {
      const editor = atom.workspace.getActiveTextEditor();
      editor.insertText(mixedText);
      editor.selectAll()
      const changeHandler = jasmine.createSpy('changeHandler');
      editor.onDidChange(changeHandler)

      atom.commands.dispatch(workspaceElement, 'pronoun-swapper:femaleify');

      waitsForPromise(() => activationPromise);

      waitsFor(() => changeHandler.callCount > 0)

      runs(() => expect(editor.getText()).toEqual(mixedFemaleifyResult))
    });

  });
});
//
//
// // Before the activation event the view is not on the DOM, and no panel
// // has been created
// expect(workspaceElement.querySelector('.pronoun-swapper')).not.toExist();
//
// // This is an activation event, triggering it will cause the package to be
// // activated.
// atom.commands.dispatch(workspaceElement, 'pronoun-swapper:toggle');
//
// waitsForPromise(() => {
//   return activationPromise;
// });
//
// runs(() => {
//   expect(workspaceElement.querySelector('.pronoun-swapper')).toExist();
//
//   let pronounSwapperElement = workspaceElement.querySelector('.pronoun-swapper');
//   expect(pronounSwapperElement).toExist();
//
//   let pronounSwapperPanel = atom.workspace.panelForItem(pronounSwapperElement);
//   expect(pronounSwapperPanel.isVisible()).toBe(true);
//   atom.commands.dispatch(workspaceElement, 'pronoun-swapper:toggle');
//   expect(pronounSwapperPanel.isVisible()).toBe(false);
// });
//
//
// it('hides and shows the view', () => {
//   // This test shows you an integration test testing at the view level.
//
//   // Attaching the workspaceElement to the DOM is required to allow the
//   // `toBeVisible()` matchers to work. Anything testing visibility or focus
//   // requires that the workspaceElement is on the DOM. Tests that attach the
//   // workspaceElement to the DOM are generally slower than those off DOM.
//   jasmine.attachToDOM(workspaceElement);
//
//   expect(workspaceElement.querySelector('.pronoun-swapper')).not.toExist();
//
//   // This is an activation event, triggering it causes the package to be
//   // activated.
//   atom.commands.dispatch(workspaceElement, 'pronoun-swapper:toggle');
//
//   waitsForPromise(() => {
//     return activationPromise;
//   });
//
//   runs(() => {
//     // Now we can test for view visibility
//     let pronounSwapperElement = workspaceElement.querySelector('.pronoun-swapper');
//     expect(pronounSwapperElement).toBeVisible();
//     atom.commands.dispatch(workspaceElement, 'pronoun-swapper:toggle');
//     expect(pronounSwapperElement).not.toBeVisible();
//   });
// });
