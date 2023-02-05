/* -------------------------------------------------------------------------- */
/*                                   Answers                                  */
/* -------------------------------------------------------------------------- */
export const ANSWER_TYPES = [
    'control_email',
    'control_checkbox',
    'control_radio',
    'control_dropdown',
    'control_textarea',
    'control_matrix',
    'control_fullname',
    'control_number',
    'control_button',
    'control_datetime',
    'control_textbox',
    'control_head',
    'control_yesno',
    'control_fileupload',
    'control_pagebreak',
    'control_mollie',
] as const;

export type AnswerType = typeof ANSWER_TYPES[number];

export const enum ANSWER_TYPE {
    EMAIL = 'control_email',
    CHECKBOX = 'control_checkbox',
    RADIO = 'control_radio',
    DROPDOWN = 'control_dropdown',
    TEXTAREA = 'control_textarea',
    MATRIX = 'control_matrix',
    FULLNAME = 'control_fullname',
    NUMBER = 'control_number',
    BUTTON = 'control_button',
    DATETIME = 'control_datetime',
    TEXTBOX = 'control_textbox',
    HEAD = 'control_head',
    MOLLIE = 'control_mollie',
}
