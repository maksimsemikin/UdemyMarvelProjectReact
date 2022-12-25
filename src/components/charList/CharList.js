import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars : [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (chars) => {
        this.setState({
            chars,
            loading: false        
        })
    }

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    charListUpdate = (arr) => {
    
        const elements = arr.map(item => {
            let imgStyle = {'objectFit' : 'cover'}
            if (item.thumbnail.match(/image_not/g)) {
                imgStyle = {'objectFit' : 'unset'};
            } 
    
            return (
                <li 
                className="char__item"
                key={item.id}>
                    <img style={imgStyle} src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
            </li>
            )
        });
    
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
        
    }

    onError = () => {
        this.setState({
            error:true,
            loading: false
        })
    }

    render () {
        const {chars, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const items = this.charListUpdate(chars);
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;