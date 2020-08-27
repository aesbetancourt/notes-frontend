// Importing needed components
import React from 'react';
import config from '../../config/config'
import { Space, Table, Modal, Input } from 'antd';
import axios from "axios"



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
        this.state = {
          data: [],
          visible: false,

          previous_note: "",
          previous_title: "",

            new_note: "",
            new_title: ""
        };
        this.openEditModal = this.openEditModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
      };

      componentDidMount(){
        this.loadData = this.loadData.bind(this);
        this.loadData()
      };

      // Load notes
      loadData(){
        let obj = this;
        let notes = [];
        axiosInstance.get('/get_notes')
      .then(res => {
        // handle success
        for (let i = 0; i < res.data.length; i++) {
          notes.push({
            "key": res.data[i].id,
            "text": res.data[i].text,
            "title": res.data[i].title
          })
        }
        obj.setState({
          data: notes
        })
      })
      .catch(err => {
        // handle error
        console.log(err);
      })
      .then(function () {
        // always executed
      });

      };

      //Delete notes
      delete(id){
        let obj = this;
        axiosInstance.delete('/remove/'+id)
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
          obj.loadData()
        });
      }



      openEditModal(record){
        // console.log(record)
        this.setState({
        visible: true,
        previous_note: record.text,
        previous_title: record.title,
        id: record.key
      })
      }

      handleOk(){
        let obj = this;
        console.log(this.state.id, this.state.new_note, this.state.new_title)
        axiosInstance.put('/update',{
          "id": this.state.id,
          "text": this.state.new_note,
          "title": this.state.new_title
        })
        .then(res => {
          // handle success
          console.log(res.data)
          this.setState({
            visible: false
          })
        })
        .catch(err => {
          // handle error
          console.log(err);
        })
        .then(function () {
          // always executed
          obj.loadData()
        });
      }

      handleCancel(){
        this.setState({
          visible: false
        })
      }

      handleChangeTitle = e => {
        this.setState({
          previous_title: e.target.value,
          new_title: e.target.value,
        })
      }

      handleChangeNote = e => {
        this.setState({
          previous_note: e.target.value,
          new_note: e.target.value,
        })
      }


render(){

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Nota',
      dataIndex: 'text',
      key: 'text',
    },
    // {
    //   title: 'Prioridad',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <span>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </span>
    //   ),
    // },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {this.openEditModal(record)}}>Editar</a>
          <a onClick={() => {this.delete(record.key)}}>Eliminar</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
    <Table
      columns={columns}
      dataSource={this.state.data}
    />
    <Modal
                title="Editar nota"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okButtonProps={{ disabled: this.state.new_note === ""}}
                okText="Actualizar"
                cancelText="Cancelar"
            >
                <Input placeholder="Sin Titulo" allowClear  style={{marginBottom: 20}} value={this.state.previous_title} onChange={this.handleChangeTitle}/>
                <TextArea rows={4} value={this.state.previous_note} onChange={this.handleChangeNote}/>
            </Modal>

    </div>
    )
}

}
export default Notes
