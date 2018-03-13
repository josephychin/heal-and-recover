const React = require('react')
const timelineService = require('../../services/timeline.service')
const authenticationService = require('../../services/authentication.service')
const moment = require('moment')

class Timeline extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            traumas: [],
            currentUser: ""
        }
    }

    componentDidMount() {
        timelineService.readMine()
            .then(data => {
                this.setState({ traumas: data.items })
            })
            .catch(err => console.warn(err))
        timelineService.currentUser()
            .then(user => {
                this.setState({ currentUser: user.item.firstName })
            })
            .catch(err => console.warn(err))
    }

    dateFormat(date) {
        const formattedDate = moment(date).format("ll");
        return formattedDate;
    }
    timeFormat(time) {
        const formattedTime = moment(time).format("h:mm A")
        return formattedTime
    }

    render() {
        let currentUserName = this.state.currentUser
        let date = null
        let timelineData = this.state.traumas.map(trauma => (

            <li key={trauma._id}>
                <div className="timeline-time">
                    <span className="time">{this.dateFormat(trauma.beginDate)}</span>
                    <span className="date">{this.timeFormat(trauma.beginDate)}</span>
                    to
                    {trauma.endDate &&
                    <div>
                         <span className="time">{this.dateFormat(trauma.endDate)}</span>
                         <span className="date">{this.timeFormat(trauma.endDate)}</span>
                    </div>
                    }
                </div>
                <div className="timeline-icon">
                    <a href="javascript:;"><i className="fa fa-edit"></i></a>
                </div>
                <div className="timeline-body">
                    <div className="timeline-header">
                        <span className="username text-muted">{trauma.type}</span>
                    </div>
                    <div className="timeline-content">
                        <p className="lead">
                            <i className="fa fa-quote-left fa-fw pull-left"></i>
                            {trauma.summary}
                            <i className="fa fa-quote-right fa-fw pull-right"></i>
                        </p>
                    </div>
                    <div className="timeline-content">
                        <p> {trauma.description}</p>
                    </div>
                </div>
            </li>
        ))

        return (
            <div>
                <div id="content">
                    <h1 className="page-header">{currentUserName}'s Timeline</h1>
                    <ul className="timeline">
                        {timelineData}
                    </ul>
                </div>
            </div>
        )
    }
}

module.exports = Timeline
