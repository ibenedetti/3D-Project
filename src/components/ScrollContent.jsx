import './scroll.css'

import hound from '../assets/hound.jpg'
import knight from '../assets/knight.jpg'
import dragon from '../assets/dragon.jpg'
import market from '../assets/market.jpg'


export const ScrollContent = ({ contentRef, papyrus }) => {
    return (
       <div
            ref={contentRef}
            className="scroll-content"
            style={{
                width: '100%', 
                backgroundImage: `url(${papyrus})`,
                backgroundSize: 'cover',
                transform: 'scale(0.5)', 
                transformOrigin: 'top center',
            }}
        >
            <h1 className="visagescroll-header" style={{ fontFamily: 'Macondo Swash Caps'}}>VisageScroll</h1>

            <div className="parchment-post">
                <span className="post-meta">Sent via Raven by Lady Elara of the Vale</span>
                <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                    <span className="drop-cap" style={{padding: '0', margin: '0', textJustify: 'center'}}>T</span>o the "Friend" who poisoned my favorite hunting hound...
                </h2>
                <img src={hound} alt="dawg" style={{height: '70%', width: '70%'}} />
                <p style={{ fontSize: '1.8rem' }}>
                    I saw you lurking by the kennels with that suspicious vial of nightshade. 
                    The King shall hear of this perjury! Our alliance is severed as cleanly as a head on the block.
                </p>
                <div className="comment-thread">
                    <div className="comment"><strong>Lord Cedric:</strong> Elara, it was merely a sedative! He wouldn't stop barking at the moon!</div>
                    <div className="comment" style={{ color: '#8b0000' }}><strong>Lady Elara:</strong> SEE YOU AT THE TOURNEY, CEDRIC. BRING A SHIELD.</div>
                </div>
            </div>

            <div className="parchment-post">
                <span className="drama-alert">🚨 SCANDAL AT THE ABBEY 🚨</span>
                <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                    <span className="drop-cap">W</span>ho was the chivalrous Knight in the Silver Helm?
                </h2>
                <img src={knight} alt="knight" />
                <p style={{ fontSize: '1.8rem' }}>
                    Spotted: The Princess's handmaiden meeting a mysterious knight behind the dragon stables. 
                    They weren't discussing "diplomacy," if you catch my drift. 
                </p>
                <div className="comment-thread">
                    <div className="comment"><strong>The Jester:</strong> I have the sketches! Only V gold pieces per copy!</div>
                </div>
            </div>

            <div className="parchment-post">
                <span className="post-meta">Posted by Barnaby the Blacksmith</span>
                <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                    <span className="drop-cap">A</span>nnouncement: I am no longer sharpening swords for the House of York.
                </h2>
                <p style={{ fontSize: '1.8rem' }}>
                    Payment in "exposure" doesn't buy grain for my children, you aristocratic leeches. 
                    From now on, pay in coin or fight with blunt spoons.
                </p>
            </div>                       

            <div className="parchment-post">
                <span className="post-meta">Sent via Carrier Pigeon by Sir Gawain</span>
                <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                    <span className="drop-cap">L</span>ost: One fire-breathing nuisance.
                </h2>
                <img src={dragon} alt="dragon" style={{height: '70%', width: '70%'}} />
                <p style={{ fontSize: '1.8rem' }}>
                    Ignis has escaped the courtyard again. If you see scorched sheep or a glowing 
                    horizon to the West, please notify the stables. Do not approach with shiny 
                    armor; he thinks you are a snack in a wrapper.
                </p>
                <div className="comment-thread">
                    <div className="comment"><strong>Shepherd Thom:</strong> He ate three of my prize rams, Gawain! Send gold or I’m calling the Dragonslayer!</div>
                    <div className="comment"><strong>Sir Gawain:</strong> Check your DMs (Direct Messengers), Thom. I’ll send a cart of ale.</div>
                </div>
            </div>

            <div className="parchment-post">
                <span className="post-meta">Channeled by Zalthar the Grey</span>
                <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                    <span className="drop-cap">U</span>npopular Opinion: Potions are a scam.
                </h2>
                <p style={{ fontSize: '1.8rem' }}>
                    I spent XL silver pieces on a "Levitation Brew" at the apothecary yesterday. 
                    All it did was give me horrific flatulence and a mild rash. Support your 
                    local sorcerers, not these high-street herbalist frauds!
                </p>
            <div className="comment-thread">
                <div className="comment"><strong>Apothecary Al:</strong> You didn't shake the vial, Zalthar. Read the runes on the label next time!</div>
            </div>
        </div>

        <div className="parchment-post">
            <span className="post-meta">Posted by Merchant Martha</span>
            <h2 className="post-title" style={{ fontFamily: 'Macondo Swash Caps'}}>
                <span className="drop-cap">T</span>he audacity of the Guild of Cobblers...
            </h2>
            <img src={market} alt="market" style={{height: '70%', width: '70%'}} />
            <p style={{ fontSize: '1.8rem' }}>
                Just witnessed a man try to trade a "magic" bean for a pair of genuine leather 
                boots. This isn't a fairy tale, Jack! I only accept gold, silver, or 
                exceptionally plump poultry. #MarketLife #NoCredit
            </p>
            <div className="comment-thread">
                <div className="comment"><strong>The Jester:</strong> To be fair, those boots were so last season, Martha.</div>
            </div>
        </div>
            <div className="parchment-post" style={{ textAlign: 'center', border: '4px solid #040404', padding: '20px' }}>
            <h2 className="post-title" style={{ color: '#040404', fontFamily: 'Macondo Swash Caps' }}>
                OFFICIAL DECREE
            </h2>
            <p style={{ fontSize: '1.6rem' }}>
                All subjects are required to "Like" the King's new portrait by sunset or face the dungeon. 
                Execution is scheduled for tomorrow for all non-followers.
            </p>
        </div>
    </div>
    )
}