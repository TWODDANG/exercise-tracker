import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// | <a href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a>
// 이것도,,?


const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id} >edit </Link>
        </td>
        <td> 이것도 안들어강ㅆ는다고??</td>
    </tr>
);

export default class ExercisesList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises : []};
    }

    componentDidMount() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({exercises: response.data})
            })
            .catch(err => console.error(err));
    }

    deleteExercise(id){
        axios.delete('/exercises' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    // exerciseList (){
    //     if(this.state.exercises) {
    //         return this.state.exercises.map(currentexercise => {
    //             return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
    //         })
    //     } else {
    //         return <div>hihihi</div>
    //     }
    //
    // }


    render(){
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {console.log(this.state.exercises)}
                    { this.state.exercises.map(currentexercise => {
                        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
                    }) }
                    </tbody>
                </table>
            </div>
        )
    }
}