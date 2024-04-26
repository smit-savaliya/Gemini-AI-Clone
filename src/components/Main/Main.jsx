import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
function Main() {

  const { onSent, recentPrompt, showresult, loding, resultData, setInput, input } = useContext(Context)
  // const sentBtn = document.querySelector("#sentBtn")
  // sentBtn.addEventListener("click", (e)=>{
  //   console.log(e)
  // })

  const handleKeypress = (e)=>{
    if(e.key === "Enter"){
      onSent()
    }
  }

  
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
          {
            !showresult
              ? <>
                <div className="info">
                  <p><span>Hello , Smit.</span></p>
                  <p>How can I help you today?</p>
                </div>

                <div className="cards">
                  <div className="card">
                    <p>Suggest beautiful places.. </p>
                    <img src={assets.compass_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Brifly summarize this concept:urban planning.. </p>
                    <img src={assets.bulb_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Suggest beautiful places..</p>
                    <img src={assets.message_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Suggest beautiful places..</p>
                    <img src={assets.code_icon} alt="" />
                  </div>


                </div>

              </>
              : <div className='result'>
                    <div className='result-title'>
                      <img src={assets.user_icon} alt="" />
                      <p>{recentPrompt}</p>

                    </div>
                    <div className='result-data'>
                          <img src={assets.gemini_icon} alt="" />
                          {
                            loding? <div className="loader">
                                  <hr />
                                  <hr />
                                  <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                          }
                          
                    </div>
                 </div>
          }

                <div className="main-bottom">
                  <div className="search-box">
                    <input onKeyPress={handleKeypress}  onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                      <img src={assets.gallery_icon} alt="" />
                      <img src={assets.mic_icon} alt="" />
                      {input ?<img id='sentBtn' onClick={()=> onSent()} src={assets.send_icon} alt="" />:null}
                      
                    </div>

                  </div>

                  <p className="bottom-info">
                    Copyright - Smit Savaliya
                  </p>
                </div>
              </div>
      </div>
      </>
      )
}

      export default Main
