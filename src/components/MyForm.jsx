import React from "react";
// import cn from "classnames";

const exampleUrl = "https://example.com/testing/things"

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: {
                email: '',
                password: '',
                address: '',
                city: '',
                country: '',
                acceptRules: false
            },
            tableIsShown: false
        }
    }

    changeHandler = ({target}) => {
        const {name, value} = target
        const localState = {...this.state.formState}
        localState[name] = value
        if (target.name === "acceptRules") localState[name] = !this.state.formState.acceptRules
        this.setState({formState: localState})
    }

    submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const response =  fetch ({
            url: exampleUrl,
            method: 'POST',
            body: {...this.state}
        })
        this.setState({tableIsShown: !this.state.tableIsShown})

        this.sortedData = []
        let stateCopy = {...this.state.formState}

        for (let item in stateCopy) {
            // if (stateCopy[item] === "") throw new Error("Dude, fill all inputs!")
            console.log(item === "acceptRules")
            if (item === "acceptRules") stateCopy[item] = stateCopy[item].toString()
            this.sortedData.push([item, stateCopy[item]])
        }
        this.sortedData.sort((a, b) => a[1] > b[1] ? 1 : -1)

    }

    switchFormHandler = () => {
        this.setState({tableIsShown: !this.state.tableIsShown})
    }

    render() {
        return (
               <>
            {
                !this.state.tableIsShown
                ?
                <form name="myForm" onSubmit={this.submitHandler}>
            <div className="col-md-6 mb-3">
                <label htmlFor="email" className="col-form-label">Email</label>
                <input value={this.state.formState['email']} type="email" name="email" className="form-control"
                       id="email" placeholder="Email" onChange={this.changeHandler} required/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="password" className="col-form-label">Password</label>
                <input value={this.state.formState['password']} type="password" name="password" className="form-control"
                       id="password" placeholder="Password" onChange={this.changeHandler} required/>
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="address" className="col-form-label">Address</label>
                <textarea value={this.state.formState['address']} type="text" className="form-control" name="address"
                          id="address" placeholder="1234 Main St" onChange={this.changeHandler} required/>
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="city" className="col-form-label">City</label>
                <input value={this.state.formState['city']} type="text" className="form-control" name="city"
                       id="city" onChange={this.changeHandler} required/>
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="country" className="col-form-label">Country</label>
                <select value={this.state.formState['country']} id="country" name="country" className="form-control"
                        onChange={this.changeHandler}>
                    <option>Choose</option>
                    <option value="argentina">Argentina</option>
                    <option value="ukraine">Ukraine</option>
                    <option value="china">China</option>
                </select>
            </div>
            <div className="col-md-6 mb-3">
                <div className="form-check">
                    <label className="form-check-label" htmlFor="rules">
                        <input id="rules" type="checkbox" name="acceptRules" className="form-check-input"
                               checked={this.state.formState.acceptRules} onChange={this.changeHandler} required/>
                            Accept Rules
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
                :
                <div>
                    <button type="button" className="btn btn-primary" onClick={this.switchFormHandler}>Back</button>
                    <table className="table">
                        <tbody>
                        {this.sortedData.map(i => {
                            return (
                                <tr key={i}>
                                    <td>{i[0]}</td>
                                    <td>{i[1]}</td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                </div>
            }
            </>

            // <>
            //     <form name="myForm" onSubmit={this.submitHandler}>
            //         <div className="col-md-6 mb-3">
            //             <label htmlFor="email" className="col-form-label">Email</label>
            //             <input type="email" name="email" className="form-control" id="email" placeholder="Email" onChange={this.changeHandler}/>
            //         </div>
            //         <div className="form-group col-md-6">
            //             <label htmlFor="password" className="col-form-label">Password</label>
            //             <input type="password" name="password" className="form-control" id="password"
            //                    placeholder="Password" onChange={this.changeHandler}/>
            //         </div>
            //         <div className="col-md-6 mb-3">
            //             <label htmlFor="address" className="col-form-label">Address</label>
            //             <textarea type="text" className="form-control" name="address" id="address"
            //                       placeholder="1234 Main St" onChange={this.changeHandler}/>
            //         </div>
            //         <div className="col-md-6 mb-3">
            //             <label htmlFor="city" className="col-form-label">City</label>
            //             <input type="text" className="form-control" name="city" id="city" onChange={this.changeHandler}/>
            //         </div>
            //         <div className="col-md-6 mb-3">
            //             <label htmlFor="country" className="col-form-label">Country</label>
            //             <select id="country" name="country" className="form-control" onChange={this.changeHandler}>
            //                 <option>Choose</option>
            //                 <option value="argentina">Argentina</option>
            //                 <option value="ukraine">Ukraine</option>
            //                 <option value="china">China</option>
            //             </select>
            //         </div>
            //         <div className="col-md-6 mb-3">
            //             <div className="form-check">
            //                 <label className="form-check-label" htmlFor="rules">
            //                     <input id="rules" type="checkbox" name="acceptRules" className="form-check-input"
            //                            checked={this.state.formState.acceptRules} onChange={this.changeHandler}/>
            //                     Accept Rules
            //                 </label>
            //             </div>
            //         </div>
            //         <button type="submit" className="btn btn-primary">Sign in</button>
            //     </form>
            //     <Table props = {this.state}/>
            // </>
        )
    }
}

export default MyForm