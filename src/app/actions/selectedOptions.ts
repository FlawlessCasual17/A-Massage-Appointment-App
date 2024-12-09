import { MassageId, TherapistUuid } from '@/utils/otherTypes'

/**
 * A basic class representing choices of
 * a massage type and a therapist.
 */
export default class {
    selectedMassage: MassageId = 0
    selectedTherapist: TherapistUuid = ''

    set(selectedMassage: MassageId, selectedTherapist: TherapistUuid) {
        this.selectedMassage = selectedMassage
        this.selectedTherapist = selectedTherapist
    }
}
