import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux';
import { removeCharacterAction, addToFavoriteAction } from '../../redux/charsDuck';

function Home({ chars, removeCharacterAction, addToFavoriteAction }) {

    function renderCharacter() {
        let char = chars[0];
        return (
            <Card
                leftClick={nextCharacter}
                rightClick={addFav}
                {...char}
            />
        )
    }

    function nextCharacter() {
        removeCharacterAction();
    }

    const addFav = () => {
        addToFavoriteAction();
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

// trae los datos del state de redux
function mapState(state) {
    return {
        chars: state.characters.array
    }
}

export default connect(mapState, { removeCharacterAction, addToFavoriteAction })(Home);