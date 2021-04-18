import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ADD_ITEM, REMOVE_ITEM } from "../../reducers/cart";
import { useSelector, useDispatch } from "react-redux";

import Messages from "./Messages";

function Chatbot() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart);
  const isLogged = useSelector((state) => state.isLogged);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = (message) => {
    const data = {
      message,
    };
    axios
      .post("https://jenny-backend.herokuapp.com/send-msg", data)
      .then((response) => {
        const responseData = {
          text: response.data.reply,
          sender: "Bot",
        };
        setResponses((responses) => [...responses, responseData]);
        if (response.data.reply === "Processing Please wait") {
          setTimeout(() => {
            const datas = {
              message: "reply",
            };
            axios
              .post("https://jenny-backend.herokuapp.com/send-msg", datas)
              .then((response) => {
                var obj = JSON.parse(response.data.reply);
                var table_data = (
                  <div>
                    <h5>Your Booking Details</h5>
                    <table>
                      <tr>
                        <td>bookingId</td>
                        <td>{obj.bookingId}</td>
                      </tr>
                      <tr>
                        <td>CarNumber</td>
                        <td>{obj.CarNumber}</td>
                      </tr>
                      <tr>
                        <td>carName</td>
                        <td>{obj.carName}</td>
                      </tr>
                      <tr>
                        <td>Start Place</td>
                        <td>{obj.Start}</td>
                      </tr>
                      <tr>
                        <td>Stop Place</td>
                        <td>{obj.Stop}</td>
                      </tr>
                      <tr>
                        <td>PickupLocation</td>
                        <td>{obj.PickupLocation}</td>
                      </tr>
                      <tr>
                        <td>PickupTime</td>
                        <td>{obj.PickupTime}</td>
                      </tr>
                      <tr>
                        <td>DropTime</td>
                        <td>{obj.DropTime}</td>
                      </tr>
                    </table>
                  </div>
                );
                const responseData = {
                  text: table_data,
                  sender: "Bot",
                };

                console.log("Response car rent ", obj);
                setResponses((responses) => [...responses, responseData]);
              })
              .catch((error) => {
                console.log("Error: ", error);
              });
          }, 15000);
        }
        if (response.data.reply === "Amazon service is being processed") {
          setTimeout(() => {
            const datas = {
              message: "Amazon reply",
            };
            axios
              .post("https://jenny-backend.herokuapp.com/send-msg", datas)
              .then((response) => {
                console.log(response);
                var amazonresult = JSON.parse(response.data.reply);
                console.log(amazonresult);
                var harsh = (
                  <form
                    name="products"
                    onSubmit={(event) => amazonHandle(event)}
                  >
                    <div class="main">
                      {amazonresult.map((ele) => {
                        return (
                          <div class="product">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={ele.Heading}
                                name={ele.Heading}
                                onChange={(event) => onChangeHandler(event)}
                              />
                            </div>
                            <div class="image">
                              <img src={ele.Image_src} />
                            </div>
                            <div class="text">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div class="title">{ele.Heading}</div>
                                <div class="price">${ele.Price}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button type="submit" class="btn btn-outline-primary">
                      Submit
                    </button>
                  </form>
                );

                const responseData = {
                  text: harsh,
                  sender: "Bot",
                };
                setResponses((responses) => [...responses, responseData]);
              })
              .catch((error) => {
                console.log(error);
              });
          }, 10000);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const onChangeHandler = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (value) {
      dispatch(ADD_ITEM(name));
    } else {
      dispatch(REMOVE_ITEM(name));
    }
  };

  const amazonHandle = (event) => {
    event.preventDefault();
    console.log("IsLogged ", isLogged.email);
    const data = {
      email: isLogged.email,
    };
    setTimeout(() => {
      axios
        .post("http://jenny-backend.herokuapp.com/myamazonorder", data)
        .then((res) => {
          console.log(res);
          console.log("Email address", data.email);
          var display_data = (
            <div>
              <h3>{res.data.msg}</h3>
              <img src={res.data.image_url}></img>
            </div>
          );
          const responseData = {
            text: display_data,
            sender: "Bot",
          };

          //console.log("Response car rent ", obj);
          setResponses((responses) => [...responses, responseData]);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 5000);
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };
    if (event.key === "Enter") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  const handleSubmitAudio = () => {
    console.log(transcript);
    const message = {
      text: transcript,
      isBot: false,
    };
    console.log("inside");
    setResponses((responses) => [...responses, message]);
    handleMessageSubmit(message.text);
  };

  const handleListening = () => {
    console.log("Listening");
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: false,
    });
  };

  const stopHandle = () => {
    console.log("Not Listening");
    setIsListening(false);
    SpeechRecognition.stopListening();
    handleSubmitAudio();
  };

  return (
    <div className="Chatbot">
      <div className="chat">
        <Messages messages={responses} />
      </div>
      <div className="message__zone">
        {isListening ? (
          <input
            type="text"
            value={transcript}
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Listening..."
            className="message__input"
          />
        ) : (
          <>
            <input
              type="text"
              value={currentMessage}
              onChange={handleMessageChange}
              onKeyDown={handleSubmit}
              placeholder="Say something..."
              className="message__input"
            />
          </>
        )}
        {isListening ? (
          <div
            className="message__mic"
            style={{ color: "red" }}
            onClick={() => stopHandle()}
          >
            <i className="fas fa-microphone"></i>
          </div>
        ) : (
          <div
            className="message__mic"
            style={{ color: "black" }}
            onClick={() => handleListening()}
          >
            <i className="fas fa-microphone"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
