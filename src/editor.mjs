import {EditorView,basicSetup}     from 'codemirror'
import {EditorState, Compartment}  from '@codemirror/state'
import {javascript, esLint}        from '@codemirror/lang-javascript'
import {htmlLanguage, html}        from '@codemirror/lang-html'
import {cssLanguage, css}          from '@codemirror/lang-css'
import {linter, lintGutter}        from '@codemirror/lint'
import {language}                  from "@codemirror/language"
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

import globals                     from 'globals'
import * as eslint                 from 'eslint-linter-browserify'

const config = {
    languageOptions: {
        globals: {
            ...globals.browser
        },
        parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module'
        }
    },
    rules: {
        semi: ['error','never']
    }
}

const wrapper = document.querySelector('.cm-editor-wrap')

const languageConf = new Compartment

let conf
switch(wrapper.dataset.lang) {
    case 'html':
        conf = html({
            extraTags: {
                'simply-render': {
                    attrs: {
                        'rel':null
                    },
                    children: []
                }
            },
            extraGlobalAttributes: {
                'data-simply-field':null,
                'data-simply-list':null,
                'data-simply-content':['fixed','template'],
                'data-simply-transformer':null,
            }
        })
    break;
    case 'css':
        conf = css()
    break;
    case 'javascript':
    default:
        conf = javascript()
    break;
}

const state = EditorState.create({
    extensions: [
        basicSetup, 
        wrapper.classList.contains('darkmode') ? githubDark : githubLight,
        languageConf.of(conf),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config))
    ]
})


const view = new EditorView({
    parent: wrapper,
    state
})