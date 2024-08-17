import React, {useState} from 'react';
import styled from 'styled-components';
import { Editor } from '@monaco-editor/react';

const EditorContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const LanguageSelector = styled.select`
  margin: 10px;
  padding: 5px;
`;

const CodeEditor = ({ code, setCode, language, setLanguage }) => {
    const [encodedCode, setEncodedCode] = useState('');
    const [decodedCode, setDecodedCode] = useState('');
    const handleEditorChange = (value) => {
        setCode(value);
        setEncodedCode(btoa(code));
        setDecodedCode(atob(encodedCode));
    }
    console.log("The code is:", code);
    // console.log("The Encoded code:", encodedCode);
    // console.log("The Decoded code:", decodedCode);
    return (
        <>
            <EditorContainer>
                <LanguageSelector
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </LanguageSelector>
                <Editor
                    height="90%"
                    language={language}
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                />
            </EditorContainer>
        </>
    )
}

export default CodeEditor
