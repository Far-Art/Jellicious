import {Component} from '@angular/core';


type Statement = {
    title: string;
    content: string[];
}

@Component({
    selector: 'jls-accessibility-statement',
    imports: [],
    templateUrl: './accessibility-statement.component.html',
    styleUrl: './accessibility-statement.component.scss'
})
export class AccessibilityStatementComponent {

    protected readonly statements: Statement[] = [
        {
            title: 'התחייבות לנגישות',
            content: ['אתר זה שואף להבטיח חוויית שימוש נגישה לכלל המבקרים, כולל אנשים עם מוגבלויות וצרכים מיוחדים.']
        },
        {
            title: 'תקני נגישות',
            content: [
                'האתר מפותח תוך יישום תקני נגישות W3C WCAG 2.1 ברמה AA, על בסיס שימוש מושכל ב:',
                '– תגים סמנטיים של HTML5 (כגון <header>, <nav>, <main>, <section>, <footer>)',
                '– תכונות ARIA מובנות (aria-label, role, aria-hidden ועוד)',
                '– מבנה כותרות היררכי (<h1>–<h6>)'
            ]
        },
        {
            title: 'תמיכה בניווט מקלדת',
            content: ['כל הפונקציות השימושיות באתר ניתנות לשימוש דרך המקלדת בלבד (Tab, Shift+Tab, Enter, Esc), כולל תפריטים נפתחים.']
        },
        {
            title: 'תאימות לקריאי מסך',
            content: ['התוכן מסומן באופן סמנטי, כך שקריאי מסך (כגון NVDA, JAWS, VoiceOver) יוכלו לפרש את הממשק והכותרות בצורה נכונה.']
        },
        {
            title: 'ניגודיות צבעים',
            content: [
                'יחס הניגודיות בין טקסט לרקע עומד על לפחות 4.5:1 (לטקסט רגיל) ו-3:1 (לטקסט גדול), בהתאם ל-WCAG 2.1 AA.',
                'האתר מזהה ומגיב למצב “ניגודיות גבוהה” (High Contrast Mode) המופעל במכשיר של המשתמש, ומיישר קו עם ההגדרות כך שערכת הצבעים תספק ניגודיות' +
                ' מוגברת ומיטבית.'
            ]
        },
        {
            title: 'יתור על תוספים חיצוניים',
            content: [
                'האתר אינו משתמש בפלאגינים או בכלים חיצוניים לנגישות (כגון תוספי “קליק להפעלת נגישות”).' +
                'ההחלטה לוותר על תוספים היא שפתרונות צד שלישי עלולים להשתנות או להתנגש עם קוד קיים.'
            ]
        },
        {
            title: 'בדיקות נגישות',
            content: ['האתר נבדק תקופתית באמצעות כלים אוטומטיים (כמו Lighthouse, axe) ובדיקת ידנית של ניווט במקלדת והתנסות באמצעות קריאי מסך.']
        }
    ];

}
