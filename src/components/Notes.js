// Importing needed components
import React from 'react';
import config from '../config/config'
import { Input, Button, Divider, Modal } from 'antd';
import axios from "axios"


import TableCrud from './Notes/Lists'

// Constants
const { TextArea } = Input
// Axios Defaults
const axiosInstance = axios.create({
    baseURL: config.backURL
});


// Exported Component
class Notes extends React.Component {
  constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
          note_text: '',
          title: '',
          visible: false,

        };
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.openCreatorModal = this.openCreatorModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);


      };


    // Functions
  openCreatorModal(){
    this.setState({
        visible: true,
    });
  }

  handleChangeNote(e){
    // console.log(e.target.value)
    this.setState({
      note_text: e.target.value,
    })
  }

  handleChangeTitle(e){
      // console.log(e.target.value)
    this.setState({
      title: e.target.value,
    })
  }


  handleOk(){
    let obj = this;
    this.setState({
        visible: false,
    });

    axiosInstance.post('/create', {
      "text": this.state.note_text,
      "title": this.state.title
    })
    .then(res => {
      // handle success
      console.log(res.data)
    })
    .catch(err => {
      // handle error
      console.log(err);
    })
    .then(function () {
      // always executed
      // obj.loadData()
      obj.child.current.loadData();

    });
  };

handleCancel(){
    // console.log('Clicked cancel button');
    this.setState({
        visible: false,
    });
};


render(){
  return (
    <div>
    <h1>Crear Nueva Nota</h1>
    <TextArea rows={4} placeholder="Escriba una nota..." onChange={this.handleChangeNote} />
    {this.state.note_text.length === 0 ? <Button type="primary" disabled>Guardar</Button> : <Button type="primary" onClick={this.openCreatorModal}>Guardar</Button> }
    <Divider plain>Notas Guardadas</Divider>
    <TableCrud ref={this.child}/>


    <Modal
            title="Creación de la nota"
            placeholder= "Ingrese título"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="Crear"
            cancelText="Cancelar"
        >
            <Input placeholder="Título" allowClear onChange={this.handleChangeTitle} />
        </Modal>

    </div>
    )
}

}
export default Notes
