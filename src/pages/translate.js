// translate.js

const data = {
    en: {
        navbar:{
            profile:"Profile",
            Settings:"Settings",
            Invite_friends:"Invite friends (+50 coins)",
            log_out:"Log Out",
            add:"Upload",
            search:"Search modules, documents or flashcards"
        },

        dashboard:{
            global_search: "Search modules, documents or flashcards",
        add_btn: "Add",
        credits:'Credit ponits',
        uploads:'UPLOADS',
        recommended_documents:'Recommended Documents',
        follower:'Followers',
        news_feed:'News Feed',
        create_a_post:'Create a Post',
        view_all:'View all',
        replies:"Replies",
        courses:"MODULES",
        upvotes:"UPVOTES",
        reply_here:"Reply here...",
        followed:'Followed'
        },

        common_words:{
            Save:"Save",
            Saved:"Saved",
            subjects:"Modules",
            joined_courses:"Joined Modules",
            recommended_courses:"Recommended Modules",
            join:"Join",
            joined:"Joined",
            edit:"Edit",
            pin_comment:"Pin Comment",
            delete:"Delete",
            search_discussion:"Search Post here",
            join_course:"Join Module",
            upload:"Upload",
            search:"Search documents in this module",
            flashset:"Search flashsets in this module",
            upload_document:"Upload a document",
            create_flashcard:"Create Flashcard",
            join_group:"Join Group",
            group_search:"Search documents in this group",
            group_flashset:"Search flashsets in this group",
            super_coins:"Super Coins"
        },

        profile:{
            uploaded_doc:"Uploaded Documents",
            followed_doc:"Followed Documents",
            upload_flashcard:"Created Flashsets",
            followed_flashcard:"Saved Flashsets",
            super_coins:"Super Coins Earned"
        },

        signup_page:{
            signup:"Sign Up",
            country:"Country",
            city:"City",
            university:"University",
            country_placeholder:"Select your country",
            city_placeholder:"Enter your city",
            university_placeholder:"Select your University",
            next:"Next Step",
            already_have_account:"Already have an Account?",
            please_login_here:"Please login here",
            agree:"agree to terms & conditions",
            university_mail:"University Email",
            password1:"Create Password",
            password2:"Confirm Password",
            password_placeholder1:"Create your Password",
            password_placeholder2:"Confirm your Password",
            get_otp:"Get OTP",
            otp_verification:"OTP Verification",
            verify_otp:"Verify OTP",
            resend_otp:"Resend OTP",
            change_email:"Change Email",
            welcome_message:"Welcome aboard! Let's start",
            first_name:"First Name",
            last_name:"Last Name",
            nick_name:"Nick Name",
            enter_your_course:"Enter your Module",
            add_course:"Add Module",
        },

        add_subjects:{
            add_subjects:"Add Modules",
            skip:"Skip this for now",
            continue:"Continue",
        },

        login_page:{
            login:"Log In",
            email:"Email",
            password:"Password",
            forgot_password:"Forgot Password?",
            agree_to_terms:"Agree to terms &  conditions",
            submit:"Submit",
            dont_have_account:"Don't have an account",
            get_started:"Get Started Today"
        },

        group:{
            create_public_group:"Create Public Group",
            create_private_group:"Create Private Group",
            create_group:"Search Group",
            search_module:"Search modules",
            recommended_groups:"Recommended Groups",
            group_name:"Group Name",
            category:"Category",
            scope:"Scope",
            group_description:"Group Description",
            placeholder:"Enter Group Id to Join",
            your_groups:"Your Groups",
            create:"Create",
            exit:"Exit",
            open_groups:"Open Groups",
            private_group:"Private Groups",
            join_group:"Search Group"
        }


    },

// German
    ge: {
        navbar:{
            profile:"Profil",
            Settings:"Einstellungen",
            Invite_friends:"Freunde einladen (+50 Coins)",
            log_out:"Abmelden",
            add:"hochladen",
            search:"Durchsuchen Sie Module, Dokumente oder Karteikarten"
        },

        dashboard:{
            global_search: "Durchsuchen Sie Module, Dokumente oder Karteikarten",
            add_btn: "Saveeee",
            credits:'CreditPunkte',
            uploads:'UPLOADS',
            recommended_documents:'Empfohlene Dokumente',
            follower:'Follower',
            news_feed:'Engagement Feed',
            create_a_post:'Beitrag erstellen',
            view_all:'Alle ansehen',
            replies:"Antworten",
            courses:"KURSE",
            upvotes:"UPVOTES",
            reply_here:"Hier antworten...",
            followed:'Folge'
        },

        common_words:{
            Save:"Speichern",
            Saved:"Gespeichert",
            subjects:"Fächer",
            joined_courses:"Verbundene Kurse",
            recommended_courses:"Empfohlene Kurse",
            join:"verbinden",
            joined:"beigetreten",
            edit:"Bearbeiten",
            pin_comment:"pinnen",
            delete:"Löschen",
            search_discussion:"Suchen Sie hier nach Diskussion",
            join_course:"Nehmen Sie am Kurs teil",
            upload:"Hochladen",
            search:"Durchsuchen Sie Dokumente in diesem Modul",
            flashset:'Suchen Sie in diesem Modul nach Flashsets',
            upload_document:"Laden Sie ein Dokument hoch",
            create_flashcard:"Karteikarte erstellen",
            join_group:"Gruppe beitreten",
            group_search:"Suchen Sie nach Dokumenten oder Karteikarten in dieser Gruppe",
            group_flashset:'Suchen Sie nach Dokumenten in dieser Gruppe',
            super_coins:"Supermünzen"
        },

        profile:{
            uploaded_doc:"Hochgeladene Dokumente",
            followed_doc:"Gefolgte Dokumente",
            upload_flashcard:"Karteikarten erstellt",
            followed_flashcard:"Gespeicherte Karteikarten",
            super_coins:"Supermünzen verdient"
        },

        signup_page:{
            signup:"Melden Sie sich an",
            country:"Country",
            city:"City",
            university:"University",
            country_placeholder:"Wähle dein Land",
            city_placeholder:"Wohnort eingeben",
            university_placeholder:"Wähle deine Universität",
            next:"Nächster Schritt",
            already_have_account:"Sie haben bereits ein Konto?",
            please_login_here:"Bitte melden Sie sich hier an",
            agree:"AGBs akzeptieren",
            university_mail:"E-Mail der Universität",
            password1:"Passwort erstellen",
            password2:"Passwort bestätigen",
            password_placeholder1:"Neues Passwort erstellen",
            password_placeholder2:"Passwort bestätigen",
            get_otp:"Holen Sie sich OTP",
            otp_verification:"OTP-Verifizierung",
            verify_otp:"OTP überprüfen",
            resend_otp:"OTP erneut senden",
            change_email:"E-Mail ändern",
            welcome_message:"Willkommen an Bord! Beginnen wir.",
            first_name:"Vorname",
            last_name:"Nachname",
            nick_name:"Spitzname",
            enter_your_course:"Wähle deinen Kurs",
            add_course:"Kurs hinzufügen",
        },

        add_subjects:{
            add_subjects:"Themen hinzufügen",
            skip:"Überspringe dies vorerst",
            continue:"Weiter",
        },

        login_page:{
            login:"Einloggen",
            email:"E-Mail",
            password:"Passwort",
            forgot_password:"Passwort vergessen?",
            agree_to_terms:"Akzeptieren Sie die Allgemeinen Geschäftsbedingungen",
            submit:"Absenden",
            dont_have_account:"Sie haben kein Konto",
            get_started:"Beginnen Sie noch heute"
        },

        group:{
            create_public_group:"Öffentliche Gruppe erstellen",
            create_private_group:"Erstellen Sie eine private Gruppe",
            create_group:"Gruppe erstellen",
            search_module:"Suchmodule",
            recommended_groups:"Empfohlene Gruppen",
            group_name:"Gruppenname",
            category:"Kategorie",
            scope:"Umfang",
            group_description:"Gruppenbeschreibung",
            placeholder:"Geben Sie die Gruppen-ID ein, der Sie beitreten möchten",
            your_groups:"Ihre Gruppen",
            create:"Erstellen",
            exit:"Ausfahrt",
            open_groups:"Offene Gruppen",
            private_group:"Private Gruppen",
            join_group:"Gruppe beitreten"
        }
    }
};

export default data;
