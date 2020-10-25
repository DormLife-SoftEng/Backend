'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dorm-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' : 'data-target="#xs-controllers-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' :
                                            'id="xs-controllers-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' : 'data-target="#xs-injectables-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' :
                                        'id="xs-injectables-links-module-AdminModule-0c569aa32cda0895b11fa7a2f1a64310"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' : 'data-target="#xs-controllers-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' :
                                            'id="xs-controllers-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' : 'data-target="#xs-injectables-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' :
                                        'id="xs-injectables-links-module-AppModule-6f2c4b9996ffa56f5e69be0d23f25cff"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' : 'data-target="#xs-controllers-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' :
                                            'id="xs-controllers-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' : 'data-target="#xs-injectables-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' :
                                        'id="xs-injectables-links-module-AuthModule-ea37dd40c2fd5fec5418a8927e6629ed"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DormModule.html" data-type="entity-link">DormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' : 'data-target="#xs-controllers-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' :
                                            'id="xs-controllers-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' }>
                                            <li class="link">
                                                <a href="controllers/DormController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DormController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' : 'data-target="#xs-injectables-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' :
                                        'id="xs-injectables-links-module-DormModule-228367dd3d1e89ae1d460805f33c53fd"' }>
                                        <li class="link">
                                            <a href="injectables/DormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DormService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LobbyModule.html" data-type="entity-link">LobbyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' : 'data-target="#xs-controllers-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' :
                                            'id="xs-controllers-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' }>
                                            <li class="link">
                                                <a href="controllers/LobbyController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LobbyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' : 'data-target="#xs-injectables-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' :
                                        'id="xs-injectables-links-module-LobbyModule-48049e12f8177835a7c1e7364dae1821"' }>
                                        <li class="link">
                                            <a href="injectables/LobbyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LobbyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModule.html" data-type="entity-link">ReviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' : 'data-target="#xs-controllers-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' :
                                            'id="xs-controllers-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' : 'data-target="#xs-injectables-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' :
                                        'id="xs-injectables-links-module-ReviewModule-991c378818e17071ab3ae5a1e411244b"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ReviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' : 'data-target="#xs-controllers-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' :
                                            'id="xs-controllers-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' : 'data-target="#xs-injectables-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' :
                                        'id="xs-injectables-links-module-UsersModule-95f896d77b7736e5e63fa41daa9c752c"' }>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/addDorm.html" data-type="entity-link">addDorm</a>
                            </li>
                            <li class="link">
                                <a href="classes/chatDto.html" data-type="entity-link">chatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/createLobbyDto.html" data-type="entity-link">createLobbyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/createLobbyDto-1.html" data-type="entity-link">createLobbyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DormAddDto.html" data-type="entity-link">DormAddDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/lobbyCodeDto.html" data-type="entity-link">lobbyCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/lobbyIdDto.html" data-type="entity-link">lobbyIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link">LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/propsSearchDto.html" data-type="entity-link">propsSearchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/propsSearchDto-1.html" data-type="entity-link">propsSearchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReviewBodyDto.html" data-type="entity-link">ReviewBodyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/reviewCodeDto.html" data-type="entity-link">reviewCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReviewParamDto.html" data-type="entity-link">ReviewParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketBodyDto.html" data-type="entity-link">TicketBodyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketIdDto.html" data-type="entity-link">TicketIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link">RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Dorm.html" data-type="entity-link">Dorm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DormAdd.html" data-type="entity-link">DormAdd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DormQuery.html" data-type="entity-link">DormQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/generalUserInfo.html" data-type="entity-link">generalUserInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/jwtPayload.html" data-type="entity-link">jwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/jwtToken.html" data-type="entity-link">jwtToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Lobby.html" data-type="entity-link">Lobby</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PendingAction.html" data-type="entity-link">PendingAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link">Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Room.html" data-type="entity-link">Room</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoomInterface.html" data-type="entity-link">RoomInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserParsedDto.html" data-type="entity-link">UserParsedDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegisterRes.html" data-type="entity-link">UserRegisterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Utility.html" data-type="entity-link">Utility</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UtilityInterface.html" data-type="entity-link">UtilityInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UtilityInterface-1.html" data-type="entity-link">UtilityInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});