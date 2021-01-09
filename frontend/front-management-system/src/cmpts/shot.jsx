import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NavBar from './navbar.jsx'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './style/shot.css'
import {REACT_APP_BACKEND_URL} from '../config_urls.js'
import load from './style/load.gif'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


function Teams(props) {
  const [linkexist, setLinkexist] = useState(false)
  useEffect(() => {
    axios.get(REACT_APP_BACKEND_URL + 'calendar/team')
        .then(function (response) {
            props.setLink(response.data.link);
            if (response.data.link){
                setLinkexist(true);
            }

        })
        .catch(function (error) {
            setLinkexist(false);
        })
    return () => { props.setLink(null)}
  }, [])

  return (
      <div>
          <p className="info">
              En confirmant la réunion vous recevez un mail de confirmation
              avec plus de detail
          </p>
      </div>
  );
}

function Skype() {

  return (
      <div>
          <p className="info">
          En confirmant la réunion vous recevez un mail de confirmation
          avec plus de detail
          </p>
      </div>
  );
}

function Phone() {
  return (
    <div>
        <p className="info">
        En confirmant la réunion vous recevez un mail de confirmation
        avec plus de detail
        </p>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
  },
  text_input: {
    marginTop: 20,
    width: '100%',
  },
  select_input: {
    marginTop: 20,
    width: '100%'
  },
  label: {
    backroundColor: 'white',
    padding: 5,
    zIndex: 5
  }
}));

export default function ShotPicker(props) {
  const classes = useStyles();
  const history = useHistory();
  let {id} = useParams()
  const token = useSelector(state => state.auth.token);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [duree, setDuree] = useState('30');
  const [toolvalue, setToolValue] = useState('teams');
  const [link, setLink] = useState(null);
  const [tarea, setTarea] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const toolChanged = (event) => {
      setToolValue(event.target.value);
  }

  const SubmitForm = (event) => {
      event.preventDefault();
      setSubmitLoading(true);
      var context = {
          name: name,
          email: email,
          duree: duree,
          tool: toolvalue,
          crenau: id,
          comment: tarea
      }
      axios.post(REACT_APP_BACKEND_URL + 'calendar/rdv', context)
          .then(function (response) {
              console.log(response.data);
              setSubmitLoading(false);
              history.push("/formsucess");
          })
          .catch(function (error) {
              console.log(error.response.data);
              setSubmitLoading(false);
              history.push("/formfail");
          })
  }

  useEffect(() => {
      setInitLoading(true);
      axios.post(REACT_APP_BACKEND_URL + 'auth/userdata_from_token/', {token: token})
          .then(function (response) {
              setName(response.data.name);
              setEmail(response.data.email);
          })
          .catch(function (error) {
          })

      axios.get(REACT_APP_BACKEND_URL + 'calendar/'+ id.toString())
          .then(function (response) {
              setDate(response.data.date);
              setHour(response.data.hour);
              setInitLoading(false);
          })
          .catch(function (error) {
              setInitLoading(false);
              history.push("/Calendar");
          })
  }, [])

  var tool;
  if (toolvalue === 'teams'){
      tool = <Teams link={link} setLink={setLink}/>
  }
  else if (toolvalue === 'skype'){
      tool = <Skype/>;
  }
  else if (toolvalue === 'phone'){
      tool = <Phone/>;
  }

  return (
      <div className="all">
          <NavBar/>
          <form className="forma" onSubmit={SubmitForm}>

              {initLoading
                                    ?
                  <img className="loadimg" src={load}></img>
                                    :
                  <div className='title'>
                      <h5> Veuillez confirmer cet entretien du </h5>
                      <h5> {date} à {hour}</h5>
                  </div>
              }
              <TextField
                    className={classes.text_input}
                    label="Votre nom"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
              />
              <TextField
                    className={classes.text_input}
                    label="Votre email"
                    type='email'
                    value={email}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    />

              <FormControl className={classes.select_input}>
                <InputLabel id="demo-simple-select-label">Durée de l'entretien</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={duree}
                  onChange={(event) => {setDuree(event.target.value)}}
                >
                  <MenuItem value={'15'}>15 minutes</MenuItem>
                  <MenuItem value={'30'}>30 minutes</MenuItem>
                  <MenuItem value={'60'}>1 heure</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.select_input}>
                <InputLabel id="demo-simple-select-label">Entretien via</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toolvalue}
                  onChange={toolChanged}
                >
                  <MenuItem value={"teams"}>Microsoft Teams</MenuItem>
                  <MenuItem value={"skype"}>Skype</MenuItem>
                  <MenuItem value={"phone"}>Appel télephonique</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.text_input}
                id="outlined-multiline-static"
                label="Commentaire (optionnel)"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                value={tarea}
                onChange={(event) => {setTarea(event.target.value)}}
              />
              <div className='rowform'>
                  {tool}
              </div>

              <br/>
              <div className='rowforma'>
                  {submitLoading ? <img className="loadimg" src={load}></img> : null}
                  <input className='submitf' type='submit' value='confirmer'/>
                  {submitLoading ? <img className="loadimg" src={load}></img> : null}
              </div>

          </form>
      </div>
  );
}
