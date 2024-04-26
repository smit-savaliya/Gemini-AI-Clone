import { createContext, useState } from "react";
import runChat from "../config/gemini.jsx"


export const Context = createContext()



const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setrecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])
    const [showresult, setShowResult] = useState(false)
    const [loding, setLoding] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index , nextword)=>{
        setTimeout(() => {
            setResultData(prev => prev+nextword)
        }, 100*index);
    }

    const newChat = ()=>{
        setLoding(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {

        setResultData("")
        setLoding(true)
        setShowResult(true)
        let responce
        if(prompt !== undefined){
            responce = await runChat(prompt)
            setrecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev => [...prev,input])
            setrecentPrompt(input)
            responce = await runChat(input)
        }
        
        
        const responceArray = responce.split("**")
        let newResponce = ""
        for(let i = 0 ;i< responceArray.length ; i++){
            if(i === 0 || i%2 !== 1){
                newResponce += responceArray[i]
            }else{
                newResponce += "<b>"+responceArray[i]+"</b>"
            }
        }

        let newResponce2 = newResponce.split("*").join("</br>")
        let newResponceArray = newResponce2.split(" ")
        for(let i=0 ; i<newResponceArray.length ; i++){
            const nextWord = newResponceArray[i]
            delayPara(i , nextWord+" ")
        }
        setResultData(newResponce2)
        setLoding(false)
        setInput("")

    }

    // onSent("What is the full form of html.")
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setrecentPrompt,
        showresult,
        loding,
        resultData,
        input,
        setInput,
        newChat
        
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider