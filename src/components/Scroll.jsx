import { Cylinder } from './Cylinder.jsx'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import papyrus from '../assets/papyrus.jpg'
import hound from '../assets/hound.jpg'
import knight from '../assets/knight.jpg'
import dragon from '../assets/dragon.jpg'
import market from '../assets/market.jpg'
import { useFrame } from '@react-three/fiber'

export const Scroll = () => {    
    const top = useRef()
    const bottom = useRef()

    const contentRef = useRef()

    const progress = useRef(0) 
    const planeRef = useRef()

    useFrame((_, delta) => {
        if (progress.current >= 1) return
        progress.current = Math.min(progress.current + delta * 0.5, 1) 

        const t = progress.current
        top.current.position.y = t * 10      
        bottom.current.position.y = t * -10  
        top.current.rotation.x = t * Math.PI * 2 
        bottom.current.rotation.x = -t * Math.PI * 2
        planeRef.current.scale.y = t        
    })
    

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY
        const x = scrollY * 0.01
        top.current.rotation.x = x
        bottom.current.rotation.x = x
        contentRef.current.style.transform = `translateY(-${scrollY}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <Cylinder position={[0, 10, 0]} rotation={[0, 0, Math.PI / 2]} ref={top} />
            <mesh ref={planeRef} position={[0, 0, -10]}> 
                <planeGeometry args={[30, 200]} />
                <meshBasicMaterial opacity={0} transparent /> 
                <Html
                    transform
                    scale={1}
                    style={{
                        width: '80dvw',
                        height: '130dvh',
                        backgroundImage: `url(${papyrus})`,
                        backgroundSize: 'cover',
                        overflow: 'hidden', 
                    }}
                >
                    <div ref={contentRef} className="scroll-content">
                        <style>
                            {`
                                * {
                                    font-family: "Macondo Swash Caps", cursive;
                                    font-weight: 400;
                                    font-style: normal;
                                    }
                                .scroll-content {
                                    color: #2c1e16;
                                    width: 90%;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    margin: 0 auto;
                                    padding: 50px 0;
                                    animation: opacity 3s ease-in-out;
                                }

                                @keyframes opacity {
                                    0% {
                                        opacity: 0;
                                    }
                                    100% {
                                        opacity: 1;
                                    }
                                }

                                .visagescroll-header {
                                    text-align: center;
                                    font-size: 5rem;
                                    margin-bottom: 50px;
                                    border-bottom: 4px double #2c1e16;
                                    color: #8b0000;
                                }

                                .parchment-post p {
                                    font-size: 3rem; 
                                    line-height: 1.2;
                                    margin-top: 10px;
                                }

                                .post-title {
                                    display: block; 
                                    font-size: 3.5rem; 
                                    margin: 20px 0;
                                }

                                .drop-cap {
                                    font-size: 5.5rem; 
                                    float: left;
                                    line-height: 0.7;
                                    border: 3px solid #8b0000;
                                    color: #8b0000;
                                    display: inline-block;padding: '0', margin: '0', textJustify: 'center'}
                                }

                                .post-meta {
                                    font-size: 3rem;
                                    font-style: italic;
                                    opacity: 0.8;
                                }

                                .drama-alert {
                                    color: #8b0000;
                                    font-weight: bold;
                                    text-transform: uppercase;
                                    letter-spacing: 2px;
                                    font-size: 2rem;
                                }

                                .comment-thread {
                                    margin-top: 20px;
                                    padding-left: 30px;
                                    border-left: 3px solid #b8860b;
                                }

                                .comment {
                                    font-size: 2rem;
                                    margin-bottom: 10px;
                                }

                                .royal-seal {
                                    display: inline-block;
                                    width: 5dvh;
                                    height: 5dvh;
                                    background: #8b0000;
                                    border-radius: 50%;
                                    vertical-align: middle;
                                    margin-right: 10px;
                                }
                            `}
                        </style>

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
                </Html>
            </mesh>
            <Cylinder position={[0, -10, 0]} rotation={[0, 0, Math.PI / 2]} ref={bottom} />
        </>
    )
}