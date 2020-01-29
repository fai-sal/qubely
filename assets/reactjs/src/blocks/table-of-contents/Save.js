import classnames from 'classnames';
import { TableOfContents } from './components';
import {Fragment} from "react";
const { Component } = wp.element;
const { RichText } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.qubelyComponents;

class Save extends Component {

    render() {
        const {
            uniqueId,
            align,
            showTitle,
            scrollToTop,
            title,
            headerLinks,
            animation,
            interaction,
            isCollapsed,
            collapsibleAlignment,
            minimizeBox,
            collapsibleType,
            collapsibleOpen,
            collapsibleIcon,
            collapsibleClose,
            scrollOffset
        } = this.props.attributes


        const classes = classnames(
            `qubely-block-${uniqueId}`,
            'qubely-block-table-of-contents',
            `qubely-align-${align}`,
        );

        const tocClasses = classnames([
            'qubely-table-of-contents',
            ...(IsInteraction(interaction) ? ['qubley-block-interaction'] : []),
            ...(isCollapsed ? ['qubely-toc-collapsed'] : [])
        ]);


        const currentIconClass = {};
        switch(collapsibleIcon) {
            case 'chevron-cirlce':
                currentIconClass.open = 'fas fa-chevron-circle-up';
                currentIconClass.close = 'fas fa-chevron-circle-down';
                break;
            case 'plus':
                currentIconClass.open = 'fas fa-plus';
                currentIconClass.close = 'fas fa-minus';
                break;
            case 'plus-square':
                currentIconClass.open = 'fas fa-plus-square';
                currentIconClass.close = 'fas fa-minus-square';
                break;
            default:
                currentIconClass.open = 'fas fa-angle-up';
                currentIconClass.close = 'fas fa-angle-down';
        }

        return (
            <div className={classes} {...animationAttr(animation)}>
                <div className={tocClasses} data-scroll={scrollToTop} data-scroll-offset={scrollOffset}>
                    <div className={classnames([
                        'qubely-table-of-contents-header',
                        collapsibleAlignment
                    ])}>
                        {
                            showTitle && (
                                <div className="qubely-table-of-contents-heading">
                                    <RichText.Content
                                        tagName='div'
                                        className='title'
                                        value={title}
                                    />
                                </div>
                            )
                        }
                        {
                            minimizeBox && (
                                <div className={`qubely-table-of-contents-toggle ${isCollapsed ? 'qubely-toc-collapsed': 'qubely-toc-not-collapsed'}`}>
                                    {
                                        collapsibleType !== 'icon' ? (
                                            <Fragment>
                                                <a className='qubely-collapsible-text qubely-toc-open-text' href='javascript:;'>{collapsibleOpen}</a>
                                                <a className='qubely-collapsible-text qubely-toc-close-text' href='javascript:;'>{collapsibleClose}</a>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <a href="javascript:;" className={classnames([
                                                    'qubely-collapsible-icon qubely-toc-close-icon',
                                                    currentIconClass.close
                                                ])} />
                                                <a href="javascript:;" className={classnames([
                                                    'qubely-collapsible-icon qubely-toc-open-icon',
                                                    currentIconClass.open
                                                ])} />
                                            </Fragment>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div className="qubely-table-of-contents-body">
                        <TableOfContents
                            headers={headerLinks && JSON.parse(headerLinks)}
                            blockProp={this.props}
                            frontend
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Save