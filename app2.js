const { Component } = React;
const { render } = ReactDOM;
const root = document.querySelector('#root');
const url = 'https://acme-users-api-rev.herokuapp.com/api/';

const list = (props) => props.map(prop => React.createElement( 'li', { key: prop.id }, prop.name))


class App extends Component {
    constructor(){
        super();
        this.state = {
            view: 'companies',
            items: [],
            itemCount: 0
        }
    }

    componentDidMount(){
        const { view} = this.state
        window.addEventListener( 'hashchange', (ev) => {
            const view = window.location.hash.slice(1);
            this.setState({ view });

            axios.get(`${url}${view}`)
            .then(response => {
                const items = response.data;
                const itemCount = response.data.length;
                this.setState({ items, itemCount})
                console.log(items, itemCount)
            });
        })
        
        window.location.hash = view;
        axios.get(`${url}${view}`)
            .then(response => {
                const items = response.data;
                this.setState({ items })
                console.log(items)
            }); 
    }

    render(){
        const { itemCount, view, items } = this.state;
        const productLink = React.createElement( 'a', { href: '#products' , className: view === 'companies'? 'selected' : '' }, `Products(${itemCount})` );
        const companyLink = React.createElement( 'a', { href: '#companies', className: view === 'products'? 'selected' :'' }, `Companies(${itemCount})` );
        const nav = React.createElement( 'nav', null, productLink, companyLink);
        const content = React.createElement( 'ul', null, list(items))
        return React.createElement( 'div', null, nav, content);

    }
}

class List extends Component {
    constructor(){
        super();

    }
}

render( React.createElement(App), root );