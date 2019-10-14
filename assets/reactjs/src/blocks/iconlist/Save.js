const { Component } = wp.element;
const { RichText } = wp.editor
const { HelperFunction: { IsInteraction } } = wp.qubelyComponents

class Save extends Component {

    renderListItems = () => {
        const { attributes: { listItems, iconPosition } } = this.props
        return listItems.map((item, index) => {
            return (
                <li className={`qubely-list-li`}>
                    { iconPosition == 'left' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} /> }
                    <RichText.Content tagName="span" value={item.text} />
                    { iconPosition == 'right' && <span className={`qubely-list-item-icon ${item.icon} fa-fw`} /> }
                </li>
            )
        })

    }
    
    render() {
        const { attributes: { uniqueId, interaction } } = this.props
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (
            <div className={`qubely-block-${uniqueId}`}>
                <div className={`qubely-block-icon-list ${interactionClass}`}>
                    <ul className="qubely-list">
                        {this.renderListItems()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Save;